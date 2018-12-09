test_r <- function(var_list) {
  result<-"Test R "
  for(i in 1:length(var_list)){
    result<- paste(result,var_list[i],sep="$")
  }

  return(result);
}
