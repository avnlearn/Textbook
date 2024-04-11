# Elementary math elements

MathML 3 adds several elements to handle elementary math problems. The elementary math elements below should be inside of either an `mstack` or an `mlongdiv` element. Both mstack and `mlongdiv` make the digits of numbers contained in them be in their own columns and their children appear in their own row; `mlongdiv`'s first three children are the divisor, dividend, and result and are treated specially.

- `msgroup` groups rows with similar alignment; options control the position and shifting of children (see multiplication and division examples below)
- `msrow` groups digits and operators into a row; options control the position of the children
- `msline` draws lines between rows of the stack; options control the position, length, thickness, and overhang of the line
- `mscarries` annotates the following row with optional borrows/carries and/or crossouts; options control the default location, style, and size of the borrows, carries, and crossouts
- `mscarry` a borrow/carry and/or crossout for a single digit; options control the location, style, and size of the borrow, carry, and/or crossout

If a blank entry in a column is needed, the element `none` can be used. This is shown in some of the examples below.

## Addition, subtraction, and multiplication problems

Here's a simple addition problem that spaces the "+" away from the operand by using the element `none`:

$$
\begin{array}{ccc}
    & 4 & 9 & 6 \\
    + &  & 2 & 8\\
    \hline\\
    \hline
\end{array}
$$

```mml
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mstack>
    <mn>496</mn>
    <msrow>
      <mo>+</mo>
      <none />
      <mn>28</mn>
    </msrow>
    <msline />
  </mstack>
</math>
```
