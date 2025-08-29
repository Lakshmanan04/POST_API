const express = require('express');
const app = express();
app.use(express.json());

const uid = "Lakshmanan_L_14112004";
const mail = "lakshmanan.l2022@vitstudent.ac.in";
const roll = "22BCE5161";

function is_num(str) {
  return /^-?\d+$/.test(str);
}

app.post('/bfhl', (req, res) => {
  try {
    const d = req.body.data;
    if (!Array.isArray(d)) {
      return res.status(400).json({ is_success: false, error: "invalid input" });
    }

    const even = [], odd = [], alpha = [], special = [];
    let total = 0, chars = [];

    d.forEach(i => {
      const s = String(i);
      if (is_num(s)) {
        const n = parseInt(s, 10);
        total += n;
        (n % 2 === 0 ? even : odd).push(s);
      } else if (/^[a-zA-Z]+$/.test(s)) {
        alpha.push(s.toUpperCase());
        chars.push(...s);
      } else {
        for (const c of s) {
          if (/[a-zA-Z]/.test(c)) {
            alpha.push(c.toUpperCase());
            chars.push(c);
          } else if (!/\d/.test(c)) {
            special.push(c);
          }
        }
      }
    });

    const rev = chars.reverse();
    let result = [], upper = true;
    rev.forEach(c => {
      result.push(upper ? c.toUpperCase() : c.toLowerCase());
      upper = !upper;
    });

    res.json({
      is_success: true,
      user_id: uid,
      email: mail,
      roll_number: roll,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alpha,
      special_characters: special,
      sum: String(total),
      concat_string: result.join('')
    });
  } catch (e) {
    res.status(500).json({ is_success: false, error: e.message });
  }
});

const port = process.env.PORT || 3000;

// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`api running on ${port}`));
}

// Export for Vercel
module.exports = app;

