using Microsoft.EntityFrameworkCore;
using SA_DbContext;
using SA_Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SA_Repositories
{
  public class UnitOfWork : IDisposable
  {
    private SADbContext _dbContext;
    private CustomerRepository<Customer> customerRepository;
    private PriceRepository<Price> priceRepository;
    private ProductRepository<Product> productRepository;
    private ProductTypeRepository<ProductType> productTypeRepository;
    private SaleRepository<Sale> saleRepository;
    private SaleChannelRepository<SaleChannel> saleChannelRepository;
    private SaleManagerRepository<SaleManager> saleManagerRepository;
    private SalePointRepository<SalePoint> salePointRepository;

    public CustomerRepository<Customer> Customers =>
      customerRepository ?? new CustomerRepository<Customer>(_dbContext);

    public PriceRepository<Price> Prices =>
      priceRepository ?? new PriceRepository<Price>(_dbContext);

    public ProductRepository<Product> Products =>
      productRepository ?? new ProductRepository<Product>(_dbContext);

    public ProductTypeRepository<ProductType> ProductTypes =>
      productTypeRepository ?? new ProductTypeRepository<ProductType>(_dbContext);

    public SaleRepository<Sale> Sales =>
      saleRepository ?? new SaleRepository<Sale>(_dbContext);

    public SaleChannelRepository<SaleChannel> SaleChannels =>
      saleChannelRepository ?? new SaleChannelRepository<SaleChannel>(_dbContext);

    public SaleManagerRepository<SaleManager> SaleManagers =>
      saleManagerRepository ?? new SaleManagerRepository<SaleManager>(_dbContext);

    public SalePointRepository<SalePoint> SalePoints =>
      salePointRepository ?? new SalePointRepository<SalePoint>(_dbContext);

    public UnitOfWork(SADbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public async Task<int> CompleteAsync()
    {
      return await _dbContext.SaveChangesAsync();
    }

    #region IDisposable Support
    private bool disposedValue = false; // To detect redundant calls

    protected virtual void Dispose(bool disposing)
    {
      if (!disposedValue)
      {
        if (disposing)
        {
          _dbContext.Dispose();
        }

        // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
        // TODO: set large fields to null.

        disposedValue = true;
      }
    }

    // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
    // ~UnitOfWork() {
    //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
    //   Dispose(false);
    // }

    // This code added to correctly implement the disposable pattern.
    void IDisposable.Dispose()
    {
      // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
      Dispose(true);
      GC.SuppressFinalize(this);
      // TODO: uncomment the following line if the finalizer is overridden above.
      // GC.SuppressFinalize(this);
    }
    #endregion
  }
}
