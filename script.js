let bluetoothDevice;
let bluetoothCharacteristic;

document.getElementById('connect').addEventListener('click', async () => {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'] // Substitua pelo UUID do serviço do seu dispositivo, se necessário
    });
    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb'); // Substitua pelo UUID do serviço do seu dispositivo, se necessário
    bluetoothCharacteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb'); // Substitua pelo UUID da característica do seu dispositivo, se necessário
    document.getElementById('status').textContent = 'Status: Conectado';
  } catch (error) {
    console.error(error);
    document.getElementById('status').textContent = 'Status: Erro na Conexão';
  }
});

const sendCommand = async (command) => {
  if (bluetoothCharacteristic) {
    await bluetoothCharacteristic.writeValue(new TextEncoder().encode(command));
  }
}

document.getElementById('pump-on').addEventListener('click', () => sendCommand('1'));
document.getElementById('pump-off').addEventListener('click', () => sendCommand('2'));
document.getElementById('lamp-on').addEventListener('click', () => sendCommand('3'));
document.getElementById('lamp-off').addEventListener('click', () => sendCommand('4'));
document.getElementById('fan-on').addEventListener('click', () => sendCommand('5'));
document.getElementById('fan-off').addEventListener('click', () => sendCommand('6'));
document.getElementById('led-strip-on').addEventListener('click', () => sendCommand('7'));
document.getElementById('led-strip-off').addEventListener('click', () => sendCommand('8'));
