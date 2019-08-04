using System;
using System.Data.SqlClient;
using System.Threading.Tasks;
using AspNetAngularAuth.Models;
using Microsoft.EntityFrameworkCore;

namespace AspNetAngularAuth.Repositories
{
    public class AuthRepository: IAuthRepository
    {
        private readonly UserContext _context;
        
        public AuthRepository(UserContext context)
        {
            _context = context;
        }

        public async Task<TblUser> Login(string email, string password)
        {
            var user = await _context.TblUser.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.Password, user.Salt))
                return null;

            return user; // auth successful
        }

        public async Task<TblUser> Register(TblUser user, string password)
        {
            byte[] passwordHash, salt;
            CreatePasswordHash(password, out passwordHash, out salt);
            user.Password = passwordHash;
            user.Salt = salt;

            await _context.TblUser.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                salt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string Username)
        {
            if (await _context.TblUser.AnyAsync(x => x.Email == Username))
                return true;
            return false;
        }

        public TblUser GetEmployeeData(int id)
        {
            try
            {
                TblUser user = new TblUser();
                using (SqlConnection con = new SqlConnection("Server=(local)\\ovisql;Database=BookStore;Trusted_Connection=True;MultipleActiveResultSets= True;"))
                {
                    string sqlQuery = "SELECT * FROM TblUser WHERE UserId= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        user.UserId = Convert.ToInt32(rdr["UserId"]);
                        user.FullName = rdr["FullName"].ToString();
                        user.Address = rdr["Address"].ToString();
                        user.Email = rdr["Email"].ToString();
                       
                    }
                }
                return user;
            }
            catch
            {
                throw;
            }
        }
    }
}