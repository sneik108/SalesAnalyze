using System;
using System.Collections.Generic;
using System.Text;

namespace SA_Models
{
  public class Product
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int ProductTypeId { get; set; }
    public ProductType ProductType { get; set; }
  }
}
