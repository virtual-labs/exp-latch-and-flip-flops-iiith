# RS Flip Flop

## Components Required - 

* 4 NAND Gates

## Circuit Connections - 

* Drag the first NAND gate and connect its input points to the S and Clk input bits.
* Drag the second NAND gate and connect its input points to the R and Clk input bits.
* Drag the third NAND gate and connect one of its input points to the output of the first NAND gate.
* Drag the fourth NAND gate and connect one of its input points to the output of the second NAND gate.
* Drag the output of the third NAND gate and connect it to the Q output bit. Also connect it to the input point of the fourth NAND gate.
* Drag the output of the fourth NAND gate and connect it to the Q' output bit. Also connect it to the input point of the third NAND gate.
* Set the Values of the R and S to 1 and 0 respectively. Remember both R and S cannot be 1 at the same time.
* Set the Clk to 1, simulate the circuit and observe the output with varying clock values.

## Observations - 

* When Clk is 0, the output bits Q and Q' remain unchanged. If Clk is 1, the output bits Q and Q' are 1,0 and 0,1 when the R and S bits are 0,1 and 1,0 respectively.
* If the circuit has been made as described above, a "Success" message will be displayed upon clicking "Submit".

# D Flip Flop

Try designing a D - Flip Flop using RS Flip Flops

<!-- ## Components Required - 

* 1 NOT gate
* 1 RS Flip Flop

## Circuit Connections - 

* Drag the NOT gate and connect its input point to the D input bit.
* Drag the RS Flip Flop and connect its input point S to the input bit D.
* Connect the input point R of the RS Flip Flop to the output of the NOT gate.
* Connect the Clk input point of the RS Flip Flop to the Clk input bit.
* Connect the Q and Q' output points of the RS Flip Flop to the Q and Q' output bits respectively. 
* Set the value of the D input bit as you wish.
* Set the Clk to 1, simulate the circuit and observe the output with varying clock values.

## Observations - 

* When Clk is 0, the output bits Q and Q' remain unchanged. If Clk is 1, the output bits Q and Q' are 1,0 and 0,1 when the D bit is 1 and 0 respectively.
* If the circuit has been made as described above, a "Success" message will be displayed upon clicking "Submit". -->

# Master-Slave JK Flip Flop

## Components Required - 

* 2 3-input NAND gates
* 6 2-input NAND Gates
* 1 NOT Gate

## Circuit Connections - 

* Drag the first 3-input NAND gate and connect its input points to the J and Clk input bits.
* Drag the second 3-input NAND gate and connect its input points to the K and Clk input bits.
* Drag the first 2-input NAND gate and connect one of its input points to the output of the first 3-input NAND gate.
* Drag the second 2-input NAND gate and connect one of its input points to the output of the second 3-input NAND gate.
* Drag the output of the first 2-input NAND gate and connect it to the input point of the second 2-input NAND gate.
* Drag the output of the second 2-input NAND gate and connect it to the input point of the first 2-input NAND gate.
* Drag the NOT gate and connect it to the Clk input bit.
* Drag the third 2-input NAND gate and connect its input points to the output of the first 2-input NAND gate and the NOT gate.
* Drag the fourth 2-input NAND gate and connect its input points to the output of the second 2-input NAND gate and the NOT gate.
* Drag the fifth 2-input NAND gate and connect one of its input points to the output of the third 2-input NAND gate. Also connect its output to the Q output bit.
* Drag the sixth 2-input NAND gate and connect one of its input points to the output of the fourth 2-input NAND gate. Also connect its output to the Q' output bit.
* Connect the output of the fifth 2-input NAND gate to the input point of the sixth 2-input NAND gate and also the input point of the second 3-input NAND gate.
* Connect the output of the sixth 2-input NAND gate to the input point of the fifth 2-input NAND gate and also the input point of the first 3-input NAND gate.
* Set the values of J and K as you wish.
* Set the Clk to 1, simulate the circuit and observe the output with varying clock values.

## Observations - 

* When Clk is 0, the output bits Q and Q' remain unchanged. If Clk is 1, the output bits Q and Q' are 1,0 and 0,1 when the J and K bits are 1,0 and 0,1 respectively. When Clk is 1 and both J and K bits are 1, the output bits Q and Q' are flipped.
* If the circuit has been made as described above, a "Success" message will be displayed upon clicking "Submit".

# T Flip Flop

Try to design a T flip FLop using a JK Flip flop.

<!-- ## Components Required - 

* 1 JK Flip Flop

## Circuit Connections - 

* Drag the JK Flip Flop and connect both of its input points J and K to the input bit T.
* Connect the Clk input point of the JK Flip Flop to the Clk input bit.
* Connect the Q and Q' output points of the JK Flip Flop to the Q and Q' output bits respectively. 
* Set the value of the T input bit as you wish.
* Set the Clk to 1, simulate the circuit and observe the output with varying clock values.

## Observations - 

* When Clk or T is 0, the output bits Q and Q' remain unchanged. If Clk and T both are 1, the output bits Q and Q' are toggled (flipped).
* If the circuit has been made as described above, a "Success" message will be displayed upon clicking "Submit". -->