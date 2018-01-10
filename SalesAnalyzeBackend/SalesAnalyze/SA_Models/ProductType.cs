﻿using System.Collections.Generic;

namespace SA_Models
{
  public class ProductType
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Product> Products { get; set; }
  }
}