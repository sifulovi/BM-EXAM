using System;
using System.Collections.Generic;

namespace AspNetAngularAuth.Models
{
    public partial class TblUser
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Address { get; set; }
        public byte[] Password { get; set; }
        public byte[] Salt { get; set; }
    }
}
