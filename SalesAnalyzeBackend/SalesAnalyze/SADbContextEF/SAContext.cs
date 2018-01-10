using Microsoft.EntityFrameworkCore;
using System;

namespace SADbContextEF
{
    public class SAContext : DbContext
    {
    public DbSet<Customer> MyProperty { get; set; }
  }
}
