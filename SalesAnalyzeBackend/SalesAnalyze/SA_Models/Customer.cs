using System.Collections.Generic;

namespace SA_Models
{
  public class Customer
  {
    public int Id { get; set; }
    //public int CustomerDetailsId { get; set; }
    public CustomerDetails CustomerDetails { get; set; }
    public int SaleChannelId { get; set; }
    public SaleChannel SaleChannel { get; set; }
    public ICollection<SalePoint> SalePoints { get; set; }
  }
}
