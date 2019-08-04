using System.ComponentModel.DataAnnotations;

namespace AspNetAngularAuth.Dtos
{
    public class RegisterDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string FullName { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Email { get; set; }
        [Required]
        [StringLength(64, MinimumLength = 4)]
        public string Password { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Role { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Address { get; set; }
    }
}