import { Anchor, Stack, Text } from '@mantine/core';
import ROUTER from '../../../config/router';

const _404NotFound = () => {
  return (
    <Stack spacing="sm" align="center" justify="center">
      <Text c="black.8" fz={28} fw={700}>
        Không tìm thấy trang
      </Text>
      <Text c="black.8" fz="xl">
        Trang đã bị xoá hoặc địa chỉ URL không đúng
      </Text>
      <Text c="black.8" fz="xl">
        Trở về&nbsp;
        <Anchor href={ROUTER.HOME.INDEX} color="primary.9" underline={false}>
          <Text span inherit fw={500} fz="xl">
            Trang Chủ
          </Text>
        </Anchor>
      </Text>
    </Stack>
  );
};

export default _404NotFound;
