using System;
using System.Collections.Generic;
using System.Text;

namespace SA_Models
{
  public class CustomerDetails
  {
    public int Id { get; set; }
    //public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
  }
}
