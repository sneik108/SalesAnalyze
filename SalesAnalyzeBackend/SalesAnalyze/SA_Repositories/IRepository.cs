using System.Collections.Generic;
using System.Threading.Tasks;

namespace SA_Repositories
{
  public interface IRepository<T> where T : class
  {
    void Add(T entity);

    void Update(T entity);

    void DeleteAsync(int entityId);

    Task<T> GetAsync(int entityId);

    IEnumerable<T> GetAll();
  }
}
