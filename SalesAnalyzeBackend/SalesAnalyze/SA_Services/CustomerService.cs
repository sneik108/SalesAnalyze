using SA_Utils;
using System;
using System.Linq;

namespace SA_Services
{
  public class CustomerService : ServiceBase
  {
    public int CustomersCount()
    {
      return _unitOfWork.Customers.GetAll().Count();
    }

    public int AvgSalePointsOnCustomer()
    {
      var customerCount = _unitOfWork.Customers.GetAll().Count();
      if (customerCount == 0) throw new ArgumentNullException();

      var salesPointsCount = _unitOfWork.SalePoints.GetAll().Count();
      if (salesPointsCount == 0) throw new ArgumentNullException();

      return salesPointsCount / customerCount;
    }

    public int AvgProductCountOnCustomer()
    {
      var soldProductCount = _unitOfWork.Sales
        .GetAll()
        .Select(s => s.ProductId)
        .Distinct()
        .Count();
      if (soldProductCount == 0) throw new ArgumentNullException();
        
      var customerCount = _unitOfWork.Customers.GetAll().Count();
      if (customerCount == 0) throw new ArgumentNullException();

      return soldProductCount / customerCount;
    }

    public int AvgSumOnCustomer()
    {
      var customerCount = _unitOfWork.Customers.GetAll().Count();
      if (customerCount == 0) throw new ArgumentNullException();
      return Helper.RandomNumber(1, 1000);
    }

  }
}
