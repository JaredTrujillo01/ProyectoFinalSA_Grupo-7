
import { Box, TextField, MenuItem, Button, Stack } from "@mui/material";

const FilterPanel = ({ filters, onChangeFilters, onSearch, categorias = [], brands = [] }) => {
  const handle = (field) => (e) => {
    onChangeFilters({ ...filters, [field]: e.target.value });
  };

  return (
    <Box>
      <Stack spacing={1}>
        <TextField
          select
          label="Sucursal"
          value={filters.branch || ""}
          onChange={handle("branch")}
          fullWidth
          margin="dense"
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Tegucigalpa">Tegucigalpa</MenuItem>
          <MenuItem value="San Pedro">San Pedro</MenuItem>
        </TextField>

        <TextField
          select
          label="Categoría"
          value={filters.category || ""}
          onChange={handle("category")}
          fullWidth
          margin="dense"
        >
          <MenuItem value="">Todas</MenuItem>
          {categorias.map((cat) => (
            <MenuItem key={cat.categoria_id} value={cat.nombre}>
              {cat.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Marca"
          value={filters.brand || ""}
          onChange={handle("brand")}
          fullWidth
          margin="dense"
        >
          <MenuItem value="">Todas</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={1}>
          <TextField
            label="Precio min"
            type="number"
            value={filters.priceMin ?? ""}
            onChange={handle("priceMin")}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Precio max"
            type="number"
            value={filters.priceMax ?? ""}
            onChange={handle("priceMax")}
            fullWidth
            margin="dense"
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField
            label="Fecha inicio"
            type="date"
            value={filters.startDate || ""}
            onChange={handle("startDate")}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Fecha fin"
            type="date"
            value={filters.endDate || ""}
            onChange={handle("endDate")}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="dense"
          />
        </Stack>

        <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={onSearch}>
          Buscar
        </Button>
      </Stack>
    </Box>
  );
};

export default FilterPanel;
