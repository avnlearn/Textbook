-- function BulletList(str)
--     -- str.text = string.upper(str.text)
--     print(str.content)
--     -- return str
-- end

function shuffle(tbl)
    for i = #tbl, 2, -1 do
        local j = math.random(i)
        tbl[i], tbl[j] = tbl[j], tbl[i]
    end
    return tbl
end

function OrderedList(str)
    if (str.style == "LowerAlpha") or (str.style == "Decimal") then
        str.content = shuffle(str.content)
    end
    return str
end


-- local doc = pandoc.Pandoc(
--   {pandoc.Math}
-- )
-- function span(str)
--     print(str.)
-- end