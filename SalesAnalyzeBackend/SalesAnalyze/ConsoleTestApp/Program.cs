using SA_DbContext;
using SA_Repositories;
using SA_Services;
using System;

namespace ConsoleTestApp
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");

      using (SADbContext dbContext = new SADbContext())
      {
        UnitOfWork unitOfWork = new UnitOfWork(dbContext);
        CustomerService service = new CustomerService();
        var count = service.CustomersCount();
        Console.WriteLine(count);
      }
      

      

      
      Console.ReadKey();
    }
  }
}
