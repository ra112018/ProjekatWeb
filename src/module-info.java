module projekat {
	requires spark.core;
    requires java.sql;
	requires gson;
	exports beans;
	opens beans;
}