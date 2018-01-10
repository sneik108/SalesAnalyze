using System;
using System.Collections.Generic;
using System.Text;

namespace SA_Models
{
  public class Price
  {
    public int Id { get; set; }
    public decimal Value { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
  }
}
