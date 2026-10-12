import { QrCode } from ".";

const meta = { title: "Components/Media/Qr Code", component: QrCode };
export default meta;

/** The printable code behind one payload. */
export const Basic = {
  render: () => <QrCode defaultValue="https://www.bysages.com/" />,
};
