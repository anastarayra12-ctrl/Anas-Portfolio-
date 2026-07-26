using Microsoft.AspNetCore.Mvc;
using AnasPortfolio.Api.Models;
using AnasPortfolio.Api.Services;

namespace AnasPortfolio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;
        private readonly IEmailService _emailService;

        public ContactController(ILogger<ContactController> logger, IEmailService emailService)
        {
            _logger = logger;
            _emailService = emailService;
        }

        /// <summary>
        /// Submits a contact form message from the portfolio SPA frontend.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> SubmitMessage([FromBody] ContactMessage model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _logger.LogInformation("Received portfolio contact submission from {Name} ({Email})", model.Name, model.Email);

            await _emailService.SendContactNotificationAsync(model.Name, model.Email, model.Message);

            return Ok(new
            {
                Success = true,
                Message = "Thank you! Your message has been received successfully by Anas Tarayra.",
                Timestamp = DateTime.UtcNow
            });
        }

        /// <summary>
        /// Health check endpoint for API monitoring.
        /// </summary>
        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok(new
            {
                Status = "Healthy",
                Service = "AnasPortfolio.Api",
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
                Timestamp = DateTime.UtcNow
            });
        }
    }
}
