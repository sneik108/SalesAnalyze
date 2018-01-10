using System;

namespace SA_Utils
{
  [AttributeUsage(AttributeTargets.Method)]
  public class CheckNullAttribute : Attribute
  {

  }

  public static class Helper
  {
    private static readonly Random random = new Random();

    public static int RandomNumber(int minValue, int maxValue)
    {
      return random.Next(minValue, maxValue);
    }

  }
}
