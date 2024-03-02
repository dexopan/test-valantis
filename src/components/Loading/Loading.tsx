import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loading() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress style={{ width: '80px', height: '80px', color: '#fdebd8' }} />
    </Stack>
  )
}
