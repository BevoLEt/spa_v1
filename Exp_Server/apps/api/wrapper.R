args <- commandArgs(TRUE)
var_list <- list()
for(i in 1:length(args)){
	var_list[[i]]<-as.character(args[i])
}

 
source("./apps/api/test.R")
#source("./log_a_b.R")
 
val <- test_r(var_list)
cat(val)