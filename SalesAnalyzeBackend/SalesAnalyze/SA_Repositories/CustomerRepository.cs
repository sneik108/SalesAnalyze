using SA_DbContext;
using SA_Models;

namespace SA_Repositories
{
  public class CustomerRepository<T> : Repository<T> where T : Customer
  {
    public CustomerRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class PriceRepository<T> : Repository<T> where T : Price
  {
    public PriceRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class ProductRepository<T> : Repository<T> where T : Product
  {
    public ProductRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class ProductTypeRepository<T> : Repository<T> where T : ProductType
  {
    public ProductTypeRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class SaleRepository<T> : Repository<T> where T : Sale
  {
    public SaleRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class SaleChannelRepository<T> : Repository<T> where T : SaleChannel
  {
    public SaleChannelRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class SaleManagerRepository<T> : Repository<T> where T : SaleManager
  {
    public SaleManagerRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }

  public class SalePointRepository<T> : Repository<T> where T : SalePoint
  {
    public SalePointRepository(SADbContext dbContext) : base(dbContext)
    {
    }
  }
}
