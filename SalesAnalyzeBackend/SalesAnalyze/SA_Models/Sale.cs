using System;
using System.Collections.Generic;
using System.Text;

namespace SA_Models
{
  public class Sale
  {
    public int Id { get; set; }
    public int SalePointId { get; set; }
    public SalePoint SalePoint { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public DateTime Date { get; set; }
    public int Count { get; set; }
  }
}
