using System.Collections.Generic;

namespace SA_Models
{
  public class SaleChannel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Customer> Customers { get; set; }
  }
}