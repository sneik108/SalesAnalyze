using System;

namespace SA_DTO
{
  public class TopCustomerModel
  {
    public string Name { get; set; }
    public decimal Value { get; set; }
  }

  public class SimpleChartModel
  {
    public string Name { get; set; }
    public decimal Value { get; set; }
  }


  public class SaleInfoByCustomerModel
  {
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public decimal SalesSum { get; set; }
    //public int SalePointsCount { get; set; }
    //public int VarietyOfProducts { get; set; }
  }
}
