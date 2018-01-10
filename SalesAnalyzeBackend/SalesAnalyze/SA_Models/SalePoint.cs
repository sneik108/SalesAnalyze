using System;

namespace SA_Models
{
  public class SalePoint
  {
    public int Id { get; set; }
    public string Address { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public int SaleManagerId { get; set; }
    public SaleManager SaleManager { get; set; }
  }
}
