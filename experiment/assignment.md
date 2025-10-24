1. Design a master-slave JK flip-flop circuit as given in the theory section. The circuit should take 3 inputs (J, K, and Clock) and produce 2 outputs (Q and Q'). Test the flip-flop with a sequence of JK inputs (e.g., 01, 10, 00, 00, 11, 11, 01) and verify the output behavior according to the characteristic table.

2. Construct a T flip-flop using the JK flip-flop designed in assignment 1. Connect both J and K inputs together to form the T input. Test the toggle flip-flop functionality by verifying that when T=0, the output remains unchanged, and when T=1, the output toggles at every clock edge.

3. Design a D flip-flop using the JK flip-flop from assignment 1. Connect the complement of J to K input and label J as 'D' input. Verify the data flip-flop operation where the output Q follows the D input: when D=1, Q=1, and when D=0, Q=0 after the clock edge.

4. Given a master-slave RS flip-flop made from NOR gates, design a circuit that behaves like a JK flip-flop. Use feedback connections from the outputs to the inputs through AND gates to eliminate the forbidden state (S=R=1). Analyze how this configuration prevents race conditions and ensures proper JK functionality.

5. Compare the timing characteristics of different flip-flop types by analyzing setup time, hold time, and propagation delay. Explain why edge-triggered flip-flops are preferred over level-triggered latches in synchronous digital systems.
