using Microsoft.EntityFrameworkCore.Internal;
using SA_DTO;
using SA_Models;
using SA_Utils;
using System;
using System.Collections.Generic;
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

    public IEnumerable<TopCustomerModel> TopByProductQuantity(int count)
    {
      CheckArgumentsForTop(count);

      var customers = _unitOfWork.Customers.GetAll(typeof(CustomerDetails).Name);
      return (from sale in _unitOfWork.Sales.GetAll()
              join salePoint in _unitOfWork.SalePoints.GetAll() on sale.SalePointId equals salePoint.Id
              join customer in customers on salePoint.CustomerId equals customer.Id
              group sale by (customer.CustomerDetails.FirstName + " " + customer.CustomerDetails.LastName) into g
              select new TopCustomerModel() { Name = g.Key, Value = g.Sum(s => s.Count) })
              .Take(count);
    }

    public IEnumerable<TopCustomerModel> TopBySum(int count)
    {
      CheckArgumentsForTop(count);

      var customers = _unitOfWork.Customers.GetAll(typeof(CustomerDetails).Name);
      var sales = _unitOfWork.Sales.GetAll(typeof(SalePoint).Name);

      return (from sale in sales
              join price in _unitOfWork.Prices.GetAll() on sale.ProductId equals price.ProductId
              join customer in customers on sale.SalePoint.CustomerId equals customer.Id
              select new TopCustomerModel() { Name = GetFullName(customer.CustomerDetails), Value = price.Value * sale.Count })
              .OrderByDescending(c => c.Value)
              .Take(count);
    }

    public IEnumerable<TopCustomerModel> TopBySalesPoints(int count)
    {
      CheckArgumentsForTop(count);

      var customers = _unitOfWork.Customers.GetAll(
        typeof(CustomerDetails).Name);

      return (from customer in customers
              join salePoint in _unitOfWork.SalePoints.GetAll() on customer.Id equals salePoint.Id
              group customer by GetFullName(customer.CustomerDetails) into g
              select new TopCustomerModel()
              {
                Name = g.Key,
                Value = g.Count()
              })
        .OrderByDescending(c => c.Value)
        .Take(count);
    }

    public IEnumerable<TopCustomerModel> TopByProductsVariety(int count)
    {
      CheckArgumentsForTop(count);

      var customers = _unitOfWork.Customers.GetAll(typeof(CustomerDetails).Name);
      var sales = _unitOfWork.Sales.GetAll(typeof(SalePoint).Name);

      return (from sale in sales
              join customer in customers on sale.SalePoint.CustomerId equals customer.Id
              group sale by GetFullName(customer.CustomerDetails) into g
              select new TopCustomerModel()
              {
                Name = g.Key,
                Value = g.Count()
              })
        .OrderByDescending(c => c.Value)
        .Take(count);
    }

    #region Private methods

    private string GetFullName(CustomerDetails customerDetails)
    {
      return customerDetails.FirstName + " " + customerDetails.LastName;
    }

    private void CheckArgumentsForTop(int count)
    {
      if (count == 0)
      {
        throw new ArgumentOutOfRangeException();
      }

      var customersCount = _unitOfWork.Customers.GetAll().Count();

      if (count > customersCount)
      {
        throw new ArgumentOutOfRangeException();
      }
    }
    #endregion
  }
}
