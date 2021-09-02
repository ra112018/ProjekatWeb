module projekat {
	requires spark.core;
    requires java.sql;
    requires java.desktop;
	requires gson;
	exports beans;
	opens beans;
}