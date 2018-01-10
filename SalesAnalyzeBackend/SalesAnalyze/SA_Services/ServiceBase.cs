using SA_DbContext;
using SA_Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace SA_Services
{
  public abstract class ServiceBase
  {
    protected UnitOfWork _unitOfWork;

    protected ServiceBase()
    {
      SADbContext dbContext = new SADbContext();
      _unitOfWork = new UnitOfWork(dbContext);
    }
  }
}
