using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Vonage;
using Vonage.Messaging;
using Microsoft.Extensions.Logging;

namespace server.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly VonageClient _VonageClient;
        private readonly string _fromNumber;
        private readonly ILogger<MessagingService> _logger;

        public MessagingService(VonageClient vonageClient, string fromNumber, ILogger<MessagingService> logger)
        {
            Debug.WriteLine($"New SmsService created at {DateTime.Now}");
            Debug.WriteLine($"VonageClient hash: {vonageClient.GetHashCode()}");
            _VonageClient = vonageClient;
            _fromNumber = fromNumber;
            _logger = logger;
        }

        public async Task SendMessageAsync(string phoneNumber, string messageContent)
        {
            try
            {
                _logger.LogDebug($"=== Starting Message Send ===");
                _logger.LogDebug($"Timestamp: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC");
                _logger.LogDebug($"Recipient: {phoneNumber}");
                _logger.LogDebug($"Content: {messageContent}");

                // Ensure sender number is in E.164 format
                var fromNumber = _fromNumber;
                if (!fromNumber.StartsWith("+"))
                {
                    fromNumber = "+" + fromNumber;
                }

                _logger.LogDebug($"Sender number: {fromNumber}");

                var request = new SendSmsRequest
                {
                    To = phoneNumber,
                    From = fromNumber,
                    Text = messageContent,
                    Type = SmsType.Text,
                    StatusReportReq = true,
                    // Add 10DLC specific parameters
                    Ttl = 3600000, // 1 hour TTL
                    ClientRef = $"campaign_{DateTime.UtcNow:yyyyMMdd}" // Add campaign reference
                };

                _logger.LogDebug($"Request details: From={request.From}, To={request.To}, Type={request.Type}, ClientRef={request.ClientRef}");

                var response = await _VonageClient.SmsClient.SendAnSmsAsync(request);
                
                _logger.LogDebug($"=== Vonage API Response ===");
                _logger.LogDebug($"Status: {response.Messages[0].Status}");
                _logger.LogDebug($"MessageId: {response.Messages[0].MessageId}");
                _logger.LogDebug($"ErrorText: {response.Messages[0].ErrorText}");
                _logger.LogDebug($"RemainingBalance: {response.Messages[0].RemainingBalance}");
                _logger.LogDebug($"MessagePrice: {response.Messages[0].MessagePrice}");
                _logger.LogDebug($"Network: {response.Messages[0].Network}");

                if (response.Messages[0].Status != "0")
                {
                    var errorMessage = $"Failed to send message. Status: {response.Messages[0].Status}, " +
                                     $"Error: {response.Messages[0].ErrorText}, " +
                                     $"MessageId: {response.Messages[0].MessageId}, " +
                                     $"Network: {response.Messages[0].Network}";
                    _logger.LogError(errorMessage);
                    throw new Exception(errorMessage);
                }

                _logger.LogInformation($"Message sent successfully to {phoneNumber}. " +
                                     $"MessageId: {response.Messages[0].MessageId}, " +
                                     $"Network: {response.Messages[0].Network}, " +
                                     $"RemainingBalance: {response.Messages[0].RemainingBalance}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error sending message to {phoneNumber}. Stack trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    _logger.LogError($"Inner exception: {ex.InnerException.Message}");
                }
                throw;
            }
        }
    }
}