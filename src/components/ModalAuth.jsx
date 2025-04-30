import { Link } from 'react-router-dom';

const ModalAuth = ({ show, handleClose }) => {
  if (!show) return null;
  return (
    <div>
      <input type="checkbox" checked readOnly id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box tablet:w-3/5 w-3/4">
          <h3 className="font-bold text-lg text-center">Bienvenido</h3>
          <p className="py-4 text-center">Inicia sesión o registrate para comenzar</p>
          <div className="flex flex-col gap-2">
            <Link to="/auth/login" className="btn btn-primary">Iniciar sesión</Link>
            <Link to="/auth/register" className="btn btn-outline btn-secondary">Registrarme</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAuth;