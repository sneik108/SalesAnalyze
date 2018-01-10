using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using SA_Utils;

namespace SA_Services
{
  public class SalesService : ServiceBase
  {
    public int SoldProductsQuantity() => _unitOfWork.Sales.GetAll().Sum(s => s.Count);

    public int SoldProductsSum() => Helper.RandomNumber(10000, 200000);

    public int AvgPrice() => Helper.RandomNumber(10, 20);

    public int TransactionsPerDay()
    {
      int uniqueDayCount = _unitOfWork.Sales
        .GetAll()
        .Select(s => s.Date)
        .Distinct()
        .Count();
      return uniqueDayCount;
    }

  }
}
