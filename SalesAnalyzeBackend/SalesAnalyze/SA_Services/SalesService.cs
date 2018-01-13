using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Linq;
using SA_DTO;
using SA_Models;
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

    public IEnumerable<SimpleChartModel> AllSalesForYear(int year)
    {
      var sales = _unitOfWork.Sales.GetAll(typeof(SalePoint).Name);
      var customers = _unitOfWork.Customers.GetAll(typeof(CustomerDetails).Name);

      var salesByMonth = from sale in sales
                         join price in _unitOfWork.Prices.GetAll() on sale.ProductId equals price.ProductId
                         join customer in customers on sale.SalePoint.CustomerId equals customer.Id
                         orderby sale.Date
                         select new
                         {
                           Name = GetFullName(customer.CustomerDetails),
                           Month = sale.Date.ToString("MMM"),
                           Sum = sale.Count * price.Value

                         };
      return from sale in salesByMonth
             group sale by sale.Month into g
             select new SimpleChartModel() { Name = g.Key, Value = g.Sum(x => x.Sum) };
    }

    public IEnumerable<SimpleChartModel> SalesBySaleChannels()
    {
      return (from saleWithSum in
          (from sale in _unitOfWork.Sales.GetAll(typeof(SalePoint).Name)
            join customer in _unitOfWork.Customers.GetAll(typeof(SaleChannel).Name) on sale.SalePoint.CustomerId equals
              customer.Id
            join price in _unitOfWork.Prices.GetAll() on sale.ProductId equals price.ProductId
            select new {Name = customer.SaleChannel.Name, Value = price.Value * sale.Count})
          group saleWithSum by saleWithSum.Name
          into g
          select new SimpleChartModel() {Name = g.Key, Value = g.Sum(x => x.Value)})
        .OrderByDescending(s => s.Value);

    }

    public IEnumerable<SaleInfoByCustomerModel> SalesInfoByCustomer()
    {
      return (from sale in _unitOfWork.Sales.GetAll(typeof(SalePoint).Name)
              join customer in _unitOfWork.Customers.GetAll(typeof(SaleChannel).Name, typeof(CustomerDetails).Name) on sale.SalePoint.CustomerId equals customer.Id
              join price in _unitOfWork.Prices.GetAll() on sale.ProductId equals price.ProductId
              select new SaleInfoByCustomerModel {Id =  customer.Id, CustomerName = GetFullName(customer.CustomerDetails), SalesSum = price.Value * sale.Count})
              .OrderByDescending(s => s.SalesSum);
    }

    private string GetFullName(CustomerDetails customerDetails)
    {
      return customerDetails.FirstName + " " + customerDetails.LastName;
    }
  }
}
