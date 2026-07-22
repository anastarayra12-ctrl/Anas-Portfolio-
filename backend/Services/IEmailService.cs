namespace AnasPortfolio.Api.Services
{
    public interface IEmailService
    {
        Task<bool> SendContactNotificationAsync(string name, string email, string message);
    }

    public class SmtpEmailService : IEmailService
    {
        private readonly ILogger<SmtpEmailService> _logger;

        public SmtpEmailService(ILogger<SmtpEmailService> logger)
        {
            _logger = logger;
        }

        public async Task<bool> SendContactNotificationAsync(string name, string email, string message)
        {
            // Simulated asynchronous SMTP notification send
            _logger.LogInformation("SMTP Dispatch: Message from {Name} <{Email}> successfully dispatched to anastarayra12@gmail.com", name, email);
            await Task.Delay(100);
            return true;
        }
    }
}
