using Microsoft.EntityFrameworkCore;
using SA_Models;

namespace SA_DbContext
{
  public class SADbContext : DbContext
  {
    public SADbContext() : base()
    {

    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<CustomerDetails> CustomerDetails { get; set; }
    public DbSet<Price> Prices { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<SaleChannel> SaleChannels { get; set; }
    public DbSet<SaleManager> SaleManagers { get; set; }
    public DbSet<SalePoint> SalePoints { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

      //optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=SA_AppDB;Trusted_Connection=True;");
      optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Integrated Security=true;Database=SA_AppDB;Trusted_Connection=True;");
      //optionsBuilder.UseSqlServer(@"Server=(localdb)\\mssqllocaldb;Integrated Security=true;Database=SA_AppDB;Trusted_Connection=True;");
    }
  }
}
