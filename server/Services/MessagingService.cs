using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Vonage;
using Vonage.Messaging;

namespace server.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly VonageClient _VonageClient;
        private readonly string _fromNumber;

        public MessagingService(VonageClient vonageClient, string fromNumber)
        {
            Debug.WriteLine($"New SmsService created at {DateTime.Now}");
            Debug.WriteLine($"VonageClient hash: {vonageClient.GetHashCode()}");
            _VonageClient = vonageClient;
            _fromNumber = fromNumber;
        }

        public async Task SendMessageAsync(string phoneNumber, string messageContent)
        {
            var messageData = new SendSmsRequest
            {
                To = phoneNumber,
                From = _fromNumber,
                Text = messageContent
            };

            var response = await _VonageClient.SmsClient.SendAnSmsAsync(messageData);

            if (response.Messages[0].Status != "0")
            {
                throw new Exception($"Failed to send message: {response.Messages[0].ErrorText}");
            }
        }
    }
}