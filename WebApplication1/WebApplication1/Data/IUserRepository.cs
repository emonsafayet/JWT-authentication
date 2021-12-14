
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
    }
}
