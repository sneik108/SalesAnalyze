using Microsoft.EntityFrameworkCore;
using SA_DbContext;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SA_Repositories
{
  public abstract class Repository<T> : IRepository<T> where T : class
  {
    private SADbContext _dbContext { get; set; }

    protected Repository(SADbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public void Add(T entity)
    {
      if (entity == null)
      {
        throw new Exception();
      }
      _dbContext.Entry(entity).State = EntityState.Added;
    }

    public async void DeleteAsync(int entityId)
    {
      var entityToDelete = await _dbContext.FindAsync<T>(entityId);
      _dbContext.Entry(entityToDelete).State = EntityState.Deleted;
    }

    public async Task<T> GetAsync(int entityId)
    {
      var entity = await _dbContext.FindAsync<T>(entityId);
      if (entity == null)
      {
        throw new ArgumentNullException();
      }
      return entity;
    }

    public void Update(T entity)
    {
      //if (entity == null)
      //{
      //  throw new ArgumentNullException();
      //}
      //int id = (int)entity.GetType().GetProperty(propIdName).GetValue(entity, null);
      

      _dbContext.Entry(entity).State = EntityState.Modified;
    }

    public IEnumerable<T> GetAll()
    {
      return _dbContext.Set<T>();
    }
  }
}
