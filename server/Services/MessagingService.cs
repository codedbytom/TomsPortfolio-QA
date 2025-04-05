using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Vonage;

namespace server.Services
{
    public class MessagingService : IMessagingService
    {
        private readonly HttpClient _httpClient;
        private VonageClient _VonageClient { get; set; }
        public MessagingService(HttpClient httpClient, VonageClient vonageClient)
        {
            Debug.WriteLine($"New SmsService created at {DateTime.Now}");
            Debug.WriteLine($"VonageClient hash: {vonageClient.GetHashCode()}");
            _httpClient = httpClient;
            _VonageClient = vonageClient;
        }

        public async Task SendMessageAsync(string phoneNumber, string messageContent)
        {
            // Here you would implement the logic to send the message.
            // This could involve calling an external SMS API.

            var messageData = new Vonage.Messaging.SendSmsRequest
            {
                To = phoneNumber,
                From = "18",
                Text = "Hi Tom! This is your first message from your own application and Vonage Phone Number!"
            };


            var json = JsonSerializer.Serialize(messageData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Example API endpoint (replace with your actual SMS provider's endpoint)
            var response = await _VonageClient.SmsClient.SendAnSmsAsync(messageData);


            if (!response.IsSuccessStatusCode)
            {
                // Handle error (log it, throw an exception, etc.)
                throw new Exception("Failed to send message");
            }
        }
    }
}