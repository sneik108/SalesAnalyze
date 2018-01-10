using System.Collections.Generic;

namespace SA_Models
{
  public class SaleManager
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<SalePoint> SalePoints { get; set; }

  }
}
