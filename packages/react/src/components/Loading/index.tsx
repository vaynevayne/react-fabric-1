import { useStore } from '../../hooks/useStore'

// bg-[hsla(221,14%,4%,0.6)
const Loading = () => {
  const loading = useStore(state => state.loading)

  return loading ? (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          width: '48px',
          height: '48px',
          border: '5px solid #04aa65',
          borderBottomColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          boxSizing: 'border-box',
          animation: 'rotation 1s linear infinite',
        }}
      ></span>
      <style>
        {`
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  ) : null
}

export default Loading
