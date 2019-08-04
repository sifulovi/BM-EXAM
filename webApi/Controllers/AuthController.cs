using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNetAngularAuth.Dtos;
using AspNetAngularAuth.Models;
using AspNetAngularAuth.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AspNetAngularAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserContext _userContext;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper, UserContext userContext)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;
            _userContext = userContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            registerDto.Email = registerDto.Email.ToLower();
            if (await _repo.UserExists(registerDto.Email))
                return BadRequest("Email already exists");

            var userToCreate = _mapper.Map<TblUser>(registerDto);
            var createdUser = await _repo.Register(userToCreate, registerDto.Password);
            return StatusCode(201, new { email = createdUser.Email, fullname = createdUser.FullName });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var userFromRepo = await _repo.Login(loginDto.Email.ToLower(), loginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.UserId.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token), email = userFromRepo.Email, fullname = userFromRepo.FullName, role = userFromRepo.Role, userId = userFromRepo.UserId, address = userFromRepo.Address });
        }


        [HttpGet("userList")]
        public async Task<IActionResult> UserList()
        {
            var data = await _userContext.TblUser.ToListAsync();
            return Ok(data);
        }

        [HttpGet("memberProfile")]
        public TblUser Details(int id)
        {
            return _repo.GetEmployeeData(id);
        }
    }
}