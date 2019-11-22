using System;
using System.Threading.Tasks;

namespace EasyParking.Db.Services
{
    public interface IUnitOfWork : IDisposable
    {
        Task CommitAsync();

        Task RollbackAsync();
    }
}
