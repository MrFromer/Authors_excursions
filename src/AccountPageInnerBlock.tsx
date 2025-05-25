import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfilePageProps } from './utilities';

function AccountPageInnerBlock({ isGuide, name = '', surname = '', username = '' }: ProfilePageProps) {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-account');
  };

  const handleCreateExcursion = () => {
    navigate('/create-excursion');
  };

  const buttonStyle = {
    backgroundColor: '#FFDD2D',
    color: '#333',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#f5cc00',
    },
  };

  return (
    <Box display="flex" justifyContent="center" p={4} width="80%" maxWidth={"700px"}>
      <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
        {/* Центрированный заголовок */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Личный кабинет
          </Typography>
        </Box>

        {/* Поля прижаты к левому краю */}
        <Box display="flex" flexDirection="column" gap={3} alignItems="flex-start">
          <Box textAlign="left">
            <Typography variant="body1" color="textSecondary">
              Имя
            </Typography>
            <Typography variant="h6">{name || '—'}</Typography>
          </Box>

          <Box textAlign="left">
            <Typography variant="body1" color="textSecondary">
              Фамилия
            </Typography>
            <Typography variant="h6">{surname || '—'}</Typography>
          </Box>

          <Box textAlign="left">
            <Typography variant="body1" color="textSecondary">
              Имя пользователя
            </Typography>
            <Typography variant="h6">{username || '—'}</Typography>
          </Box>
        </Box>

        {/* Обе кнопки снизу, центрированы */}
        <Box mt={6} display="flex" flexDirection="column" gap={2} alignItems="center">
          <Button variant="contained" sx={buttonStyle} onClick={handleEditProfile} style={{width: "250px"}}>
            Изменить
          </Button>

          {isGuide && (
            <Button variant="contained" sx={buttonStyle} onClick={handleCreateExcursion} style={{width: "250px"}}>
              Создать экскурсию
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default AccountPageInnerBlock;
