import styled from 'styled-components/native';

const StyledFloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 20px;
  z-index: 1000;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
`;

const FloatingButton = styled.TouchableOpacity`
paddingHorizontal: 20px;
paddingVertical: 10px;
borderRadius: 5px;
backgroundColor: #000;
color: #fff;
`;

export default function Button({title, onPress}) {
    return (
        <FloatingButton onPress={onPress}>
            <Text>{title}</Text>
        </FloatingButton>
    )
}
`