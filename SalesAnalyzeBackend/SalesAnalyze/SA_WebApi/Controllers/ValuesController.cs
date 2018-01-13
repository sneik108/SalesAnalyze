using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SA_DTO;
using SA_Services;

namespace SA_WebApi.Controllers
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    private readonly CustomerService _customerService;
    private readonly SalesService _salesService;
    public ValuesController()
    {
      _customerService = new CustomerService();
      _salesService = new SalesService();
    }
    // GET api/values
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //  return new string[] { "value1", "value2" };
    //}

    // GET api/values/5
    [HttpGet("customers/count")]
    public int Count()
    {
      return _customerService.CustomersCount();
    }

    [HttpGet("customers/avgSalePointsOnCustomer")]
    public int AvgSalePointsOnCustomer()
    {
      return _customerService.AvgSalePointsOnCustomer();
    }

    [HttpGet("customers/avgProductCountOnCustomer")]
    public int AvgProductCountOnCustomer() => _customerService.AvgProductCountOnCustomer();

    [HttpGet("customers/avgSumOnCustomer")]
    public int AvgSumOnCustomer() => _customerService.AvgSumOnCustomer();

    

    #region Sales

    [HttpGet("sales/soldProductsQuantity")]
    public int SoldProductsQuantity() => _salesService.SoldProductsQuantity();

    [HttpGet("sales/soldProductsSum")]
    public int SoldProductsSum() => _salesService.SoldProductsSum();

    [HttpGet("sales/avgPrice")]
    public int AvgPrice() => _salesService.AvgPrice();

    [HttpGet("sales/transactionsPerDay")]
    public int TransactionsPerDay() => _salesService.TransactionsPerDay();

    [HttpGet("sales/allSalesForYear/{year}")]
    public IEnumerable<SimpleChartModel> AllSalesForYear(int year) => _salesService.AllSalesForYear(year);

    [HttpGet("sales/salesBySaleChannels")]
    public IEnumerable<SimpleChartModel> SalesBySaleChannels() => _salesService.SalesBySaleChannels();

    [HttpGet("sales/salesInfoByCustomer")]
    public IEnumerable<SaleInfoByCustomerModel> SalesInfoByCustomer() => _salesService.SalesInfoByCustomer();

    #endregion Sales

    #region TopCustomers
    [HttpGet("customers/topByProductQuantity/{count}")]
    public IEnumerable<TopCustomerModel> TopByProductQuantity(int count)
    {
      return _customerService.TopByProductQuantity(count);
    }

    [HttpGet("customers/topBySum/{count}")]
    public IEnumerable<TopCustomerModel> TopBySum(int count) => _customerService.TopBySum(count);

    [HttpGet("customers/topBySalesPoints/{count}")]
    public IEnumerable<TopCustomerModel> TopBySalesPoints(int count)
    {
      return _customerService.TopBySalesPoints(count);
    }

    [HttpGet("customers/topByProductsVariety/{count}")]
    public IEnumerable<TopCustomerModel> TopByProductsVariety(int count)
    {
      return _customerService.TopByProductsVariety(count);
    }

    #endregion

    #region ChartsApi



    #endregion


    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
