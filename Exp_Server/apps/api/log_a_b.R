log_a_b <- function(a, b) {
  if (b <= 0) {
    ret = "Error: b must be greater than 0";
    return(ret);
  }
 
  if (a <= 0) {
    ret = "Error: a must be greater than 0";
    return(ret);
  }
  else if (a == 1) {
    ret = "Error: a must not be 1";
    return(ret);
  }
 
  ret <- log10(b) / log10(a);
  return(ret);
}
